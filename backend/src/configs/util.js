export const {
    EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    JWT_KEY = "llave-super-secreta-para-los-token-de-jwt",
    BCRYPT_SALTS = 1
} = process.env;