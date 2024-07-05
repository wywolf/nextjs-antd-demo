import withAntdLess from 'next-plugin-antd-less';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 其他 Next.js 配置...
};

export default withAntdLess({
  modifyVars: {
    '@primary-color': '#1DA57A', // 设置你的主题颜色
  },
  lessVarsFilePath: './src/styles/variables.less', // 如果你有 less 变量文件
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },
  ...nextConfig,
});
