type Status = {
  ok: HttpStatusCode,
  noContent: HttpStatusCode,
  notFound: HttpStatusCode,
  internalServerError: HttpStatusCode
};

const status: Status = {
  ok: 200,
  noContent: 201,
  notFound: 404,
  internalServerError: 500
};

export default status;
