// import  crypto from "node:crypto";

// const salt = crypto.randomBytes(16);

// crypto.pbkdf2("password", salt, 100000,32, "sha256", (error, output) => {
//     console.log(output.toString("base64url"));
//     console.log(salt.toString("base64url"));
// });


// bcrypt
import bcrypt from "bcrypt";
// const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash("password", 15);



