export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context;

  // Mendapatkan istilah pencarian dari query parameter
  const query = getQuery(event).query;

  if (query) {
    // Melakukan pencarian teks menggunakan FTS pada kolom name
    const stmt = cloudflare.env.DB.prepare(`
      SELECT referensi.*
      FROM referensi
      JOIN referensi_fts ON referensi.name = referensi_fts.name
      WHERE referensi_fts MATCH ?
    `).bind(query);

    const results = await stmt.all();

    // Mengembalikan hasil pencarian sebagai respons
    return results.results;
  } else {
    // Jika tidak ada istilah pencarian, mengembalikan pesan kesalahan
    throw createError({
      statusCode: 400,
      statusMessage: 'Istilah pencarian tidak ditemukan',
    });
  }
});