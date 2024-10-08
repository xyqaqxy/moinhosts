module.exports = {
  async call(ctx) {
    const { platformId, apiId, params } = ctx.request.body;

    try {
      // 获取云平台信息
      const platform = await strapi.entityService.findOne('api::cloud-platform.cloud-platform', platformId, {
        populate: ['apis'],
      });

      if (!platform) {
        return ctx.badRequest('Cloud platform not found');
      }

      // 获取 API 信息
      const api = platform.apis.find(api => api.id === apiId);

      if (!api) {
        return ctx.badRequest('API not found');
      }

      // 这里应该实现实际的 API 调用逻辑
      // 为了演示，我们只返回一个模拟的响应
      const response = {
        platform: platform.name,
        api: api.name,
        params: params,
        result: 'Simulated API call result',
      };

      return response;
    } catch (error) {
      console.error('Error in unified API call:', error);
      return ctx.badRequest('An error occurred while processing the API call');
    }
  },
};