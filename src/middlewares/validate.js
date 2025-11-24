export const validate = (schemas = {}) => (request, _response, next) => {
  try {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.query) {
      const validated = schemas.query.parse(request.query);
      // Usa defineProperty para sobrescrever a propriedade read-only
      Object.defineProperty(request, 'query', {
        value: validated,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
    if (schemas.params) {
      const validated = schemas.params.parse(request.params);
      // Usa defineProperty para sobrescrever a propriedade read-only
      Object.defineProperty(request, 'params', {
        value: validated,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }

    return next();
  } catch (error) {

    console.log({ error })
    const issues = error?.issues?.map(i => ({
      path: i.path,
      message: i.message
    })) ?? null;

    return next({
      message: 'Validation error',
      status: 400,
      code: 'BAD_REQUEST',
      details: issues
    });
  }
};