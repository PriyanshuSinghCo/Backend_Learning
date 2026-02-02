// import { connectDB, client } from "./db.js";

// try {
//   const db = await connectDB();

//   await db.command({
//     collMod: "users",
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         required: ["_id", "name", "email", "password", "rootDirId"],
//         properties: {
//           _id: { bsonType: "objectId" },
//           name: { bsonType: "string", minLength: 3 },
//           email: {
//             bsonType: "string",
//             pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
//           },
//           password: { bsonType: "string", minLength: 4 },
//           rootDirId: { bsonType: "objectId" }
//         },
//         additionalProperties: false
//       }
//     },
//     validationLevel: "strict",
//     validationAction: "error"
//   });

//   console.log("Schema validation applied");
// } catch (err) {
//   console.error(err);
// } finally {
//   await client.close();
// }


import { connectDB } from "./db.js";
import "../models/userModel.js"; // just importing registers schema

const setupDB = async () => {
  try {
    await connectDB();

    console.log("✅ Database setup completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
};

setupDB();
