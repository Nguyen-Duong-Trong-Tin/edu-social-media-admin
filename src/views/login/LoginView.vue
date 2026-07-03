<template>
  <div
    class="bg-white w-full max-w-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10">

    <div class="flex flex-col items-center mb-8">
      <div class="bg-blue-600 p-3 rounded-xl mb-4 shadow-sm">
        <GraduationCap class="w-8 h-8 text-white" stroke-width="2.5" />
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-1 tracking-tight">EduSocial</h1>
      <p class="text-sm text-gray-500 font-medium">Admin Panel</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">

      <div>
        <label for="userName" class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">User
          Name</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail class="h-5 w-5 text-gray-400" />
          </div>
          <input id="userName" v-model="userName" required
            class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="admin@edusocial.edu" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label for="password"
            class="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
          <a href="#" class="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot
            Password?</a>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-400" />
          </div>
          <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
            class="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="••••••••" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
            <EyeOff v-if="showPassword" class="h-5 w-5" />
            <Eye v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="pt-2">
        <button type="submit"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Sign In
        </button>
      </div>
    </form>

    <div class="mt-8 mb-6 relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-xs">
        <span class="px-2 bg-white text-gray-400 font-semibold uppercase tracking-widest">Secure Access</span>
      </div>
    </div>

    <div class="flex justify-center items-center space-x-2 text-sm text-gray-500 font-medium">
      <a href="#" class="hover:text-gray-800 transition-colors">Back to Website</a>
      <span class="text-gray-300">•</span>
      <a href="#" class="hover:text-gray-800 transition-colors">Contact Support</a>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

import { loginAuthApi } from '@/apis/auth'
import { setCookie } from '@/utils/cookie'
import type { IResponse } from '@/interfaces'
import type {  IAuthLoginResponse } from '@/interfaces/auth'

const router = useRouter()

const userName = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  try {
    const response: IResponse<IAuthLoginResponse> = await loginAuthApi({
      userName: userName.value,
      password: password.value,
    });

    if (response.status !== 200) {
      toast.error("Invalid credentials!");
      return;
    }

    const { data: { accessToken, refreshToken, account } } = response;

    setCookie("accessToken", accessToken, 7);
    setCookie("refreshToken", refreshToken, 7);
    setCookie("userName", account.userName, 7);
    setCookie("role", account.role.name, 7);

    router.push("/");
  } catch (error) {
    const myError = error as { status: number };
    if (myError.status === 400) {
      toast.error("Invalid credentials!");
      return;
    }

    toast.error("Something went wrong!")
  }
}
</script>

<style scoped></style>
