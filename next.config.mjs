/** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//
//     target: "web", //target that needs special rules, then all your other special config rules in this object
//     node: {
//         fs: "empty",
//     },
// };

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
            };
        }

        return config;
    },
};

export default nextConfig;
