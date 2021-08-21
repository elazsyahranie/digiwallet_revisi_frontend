module.exports = {
  env: {
    APP_NAME: "Digiwallet",
    BASE_URL: "http://localhost:3003/api/v1",
  },
  async rewrites() {
    return [
      // Jadi kalau akses halaman login cukup pakai /login
      {
        source: "/login", // pengganti path pada react js
        destination: "/auth/login", // lokasi path
      },
      {
        source: "/signup", // pengganti path pada react js
        destination: "/auth/signup", // lokasi path
      },
      {
        source: "/insert-pin", // pengganti path pada react js
        destination: "/auth/insertpin", // lokasi path
      },
      {
        source: "/dashboard", // pengganti path pada react js
        destination: "/dashboard", // lokasi path
      },
      {
        source: "/search", // pengganti path pada react js
        destination: "/transfer/search", // lokasi path
      },
      {
        source: "/input", // pengganti path pada react js
        destination: "/transfer/input ", // lokasi path
      },
    ];
  },
};
