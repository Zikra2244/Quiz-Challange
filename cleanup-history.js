// cleanup-history.js
// Jalankan di browser console untuk membersihkan duplikat

(function cleanupQuizHistory() {
  console.log("🧹 Membersihkan duplikat quiz history...");
  
  const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");
  console.log(`📊 Total data sebelum: ${history.length}`);
  
  // Hapus duplikat berdasarkan timestamp dan score
  const unique = history.filter((item, index, self) => 
    index === self.findIndex((t) => 
      t.timestamp === item.timestamp && t.score === item.score
    )
  );
  
  console.log(`✨ Total data sesudah: ${unique.length}`);
  console.log(`🗑️ Duplikat dihapus: ${history.length - unique.length}`);
  
  localStorage.setItem("quiz_history", JSON.stringify(unique));
  console.log("✅ Selesai! Refresh halaman untuk melihat perubahan.");
  
  return {
    before: history.length,
    after: unique.length,
    removed: history.length - unique.length
  };
})();
