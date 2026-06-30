<template>
  <div
    class="min-h-screen flex flex-col justify-between relative bg-slate-50 bg-gradient-to-br from-white via-blue-50 to-blue-100 selection:bg-blue-200">

    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
    </div>

    <main class="flex-grow flex items-center justify-center p-4 z-10">
      <router-view />
    </main>

    <footer
      class="z-10 py-5 px-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-xs font-semibold text-gray-700">
        © {{ new Date().getFullYear() }} EduSocial Admin Panel. All rights reserved.
      </p>
      <div class="flex items-center space-x-4 text-xs font-medium text-gray-500">
        <a href="#" class="hover:text-gray-800 transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-gray-800 transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-gray-800 transition-colors">Support</a>
      </div>
    </footer>

  </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.bg-gradient-to-br {
  background-image: url("/images/auth-background.png");
  background-size: cover;
  background-position: center;
}
</style>
