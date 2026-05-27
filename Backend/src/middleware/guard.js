import jwt from "jsonwebtoken";

export const verifyTokenGuard = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const payload = jwt.verify(token, process.env.FORGOT_TOKEN_SECRET);

    req.user = payload;

    next(); // 🔥 important

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const invalid =async (res) => {
  res.cookie("authToken", null, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT !== "DEV",
    sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
    path: "/",
    domain: undefined,
    maxAge: 0,
  });

  res.status(400).json({ message: "Bad Request" });
};

export const AdminUserGuard =async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken)
     return invalid(res);

  const payload=await jwt.verify(authToken, process.env.AUTH_SECRETE)

  if(payload.role !== "user" && payload.role !== "admin")
    return invalid(res);


  req.user=payload;
  next();
};
// export const AdminUserGuard = (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.authToken ||
//       req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const payload = jwt.verify(token, process.env.AUTH_SECRET);

//     if (!payload.role) {
//       return res.status(401).json({ message: "Invalid token payload" });
//     }

//     if (payload.role !== "user" && payload.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     req.user = payload;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
export const AdminGuard =async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken)
     return invalid(res);

  const payload=await jwt.verify(authToken, process.env.AUTH_SECRETE)

  if( payload.role !== "admin")
    return invalid(res);


  req.user=payload;
  next();
};
