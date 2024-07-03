import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const mysqlConfig = {
    host: "127.0.0.1",
    user: "sammy",
    password: "Password@123!",
    database: "noblemarriage"
};

const dynamoClient = new DynamoDBClient({ region: process.env.DYNAMODB_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(dynamoClient);

const migrateData = async () => {
  let connection;

  try {
    connection = await createConnection(mysqlConfig);
    console.log('Connected to MySQL database');

    const [rows] = await connection.execute('SELECT * FROM users LIMIT 10');

    for (const row of rows) {
      const putParams = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: row.id,
          name: row.name,
        }
      };

      try {
        await ddbDocClient.send(new PutCommand(putParams));
        console.log(`Inserted record with id ${row.id} into DynamoDB`);
      } catch (err) {
        console.error(`Failed to insert record with id ${row.id} into DynamoDB:`, err);
      }
    }
  } catch (err) {
    console.error('Error connecting to MySQL or querying data:', err);
  } finally {
    if (connection) {
      await connection.end();
      console.log('MySQL connection closed');
    }
  }
};

migrateData();
