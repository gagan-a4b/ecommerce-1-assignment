import jwt from 'jsonwebtoken';

const secret = "6dbf1f176d13ff93f010b648d7556f690c23a6e33a08d31b10c4ec38299d50cf44b1ffeda0ced647cdf8bea5618adb04ca20a87a49b0618426dbcdcebd1bf4052e0564e9da65863f25a77b8fd8afe94428599e64b6faa94621882390d62b242b6e8803703117e38169b7da786d88bbe4f972b44af74e192278b0c0fefb6273ec4e1166ee0838812dc5dd49d341007a7656d2b86147ec683eb882857459e2d0b211669a1b0e60ca803dd2e8d03de029741cdc8a551dcf446e2f03cfb476efd29d880e1a61014f513a38dc4839fc3634b4e6892e41dfed3f9a1c8a74c88f91905522a5066aae6858699df5a611a561acfd9f83288f91c162efe274217c46ae0f03"

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
