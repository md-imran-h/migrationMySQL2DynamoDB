"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var promise_1 = require("mysql2/promise");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// MySQL database configuration
var mysqlConfig = {
    host: "127.0.0.1",
    user: "sammy",
    password: "Password@123!",
    database: "noblemarriage"
};
// DynamoDB client configuration
var dynamoClient = new client_dynamodb_1.DynamoDBClient({ region: process.env.DYNAMODB_REGION });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoClient);
var migrateData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, rows, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 7]);
                return [4 /*yield*/, (0, promise_1.createConnection)(mysqlConfig)];
            case 1:
                connection = _a.sent();
                console.log('Connected to MySQL database');
                return [4 /*yield*/, connection.execute('SELECT * FROM users')];
            case 2:
                rows = (_a.sent())[0];
                return [3 /*break*/, 7];
            case 3:
                err_1 = _a.sent();
                console.error('Error connecting to MySQL or querying data:', err_1);
                return [3 /*break*/, 7];
            case 4:
                if (!connection) return [3 /*break*/, 6];
                return [4 /*yield*/, connection.end()];
            case 5:
                _a.sent();
                console.log('MySQL connection closed');
                _a.label = 6;
            case 6: return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
migrateData();
