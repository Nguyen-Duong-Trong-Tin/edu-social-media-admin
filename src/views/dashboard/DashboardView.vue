<template>
  <div class="flex p-8 flex-col gap-6">
    <div class="flex flex-col gap-1">
      <h1 class="font-bold text-2xl leading-8">Dashboard</h1>
      <p class="text-neutral-500 text-sm leading-5">Welcome back, Admin!</p>
    </div>

    <!-- STAT CARDS -->
    <div class="grid grid-cols-4 gap-6">
      <Card class="p-6 gap-4">
        <CardContent class="flex p-0 justify-between items-center">
          <div class="flex flex-col gap-1">
            <span class="text-neutral-500 text-sm leading-5">Total Users</span>
            <span class="font-bold text-2xl leading-8">1,240</span>
            <span class="font-medium text-emerald-600 text-xs leading-4 flex items-center gap-1">
              <TrendingUp class="size-3" /> +12.5%
            </span>
          </div>
          <div class="size-12 rounded-xl bg-[#1877F2]/10 flex justify-center items-center">
            <User class="size-6 text-[#1877F2]" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-6 gap-4">
        <CardContent class="flex p-0 justify-between items-center">
          <div class="flex flex-col gap-1">
            <span class="text-neutral-500 text-sm leading-5">Total Courses</span>
            <span class="font-bold text-2xl leading-8">86</span>
            <span class="font-medium text-emerald-600 text-xs leading-4 flex items-center gap-1">
              <TrendingUp class="size-3" /> +4.2%
            </span>
          </div>
          <div class="size-12 rounded-xl bg-violet-500/10 flex justify-center items-center">
            <BookOpen class="size-6 text-violet-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-6 gap-4">
        <CardContent class="flex p-0 justify-between items-center">
          <div class="flex flex-col gap-1">
            <span class="text-neutral-500 text-sm leading-5">Total Posts</span>
            <span class="font-bold text-2xl leading-8">4,530</span>
            <span class="font-medium text-emerald-600 text-xs leading-4 flex items-center gap-1">
              <TrendingUp class="size-3" /> +8.1%
            </span>
          </div>
          <div class="size-12 rounded-xl bg-amber-500/10 flex justify-center items-center">
            <FileText class="size-6 text-amber-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-6 gap-4">
        <CardContent class="flex p-0 justify-between items-center">
          <div class="flex flex-col gap-1">
            <span class="text-neutral-500 text-sm leading-5">Total Roles</span>
            <span class="font-bold text-2xl leading-8">5</span>
            <span class="font-medium text-neutral-500 text-xs leading-4 flex items-center gap-1">
              <Minus class="size-3" /> Stable
            </span>
          </div>
          <div class="size-12 rounded-xl bg-rose-500/10 flex justify-center items-center">
            <Shield class="size-6 text-rose-500" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- CHARTS SECTION -->
    <div class="grid grid-cols-2 gap-6">
      <Card class="p-6 gap-4">
        <CardHeader class="p-0 flex-row justify-between items-center gap-2">
          <div class="flex flex-col gap-1">
            <CardTitle class="text-base leading-6">User Registrations Over Time</CardTitle>
            <CardDescription class="text-xs leading-4">Last 7 days</CardDescription>
          </div>
          <MoreHorizontal class="size-5 text-neutral-500" />
        </CardHeader>
        <CardContent class="p-0 mt-4">
          <ChartContainer class="w-full h-[250px]" :config="{ users: { color: '#1877F2', label: 'Users' } }">
            <VisXYContainer :data="areaData" class="h-full">
              <VisArea :x="(d: any, i: number) => i" :y="(d: any) => d.users" color="#1877F2" />
              <VisAxis type="x" :tickFormat="(i: number) => areaData[i]?.day || ''" />
              <ChartTooltip />
            </VisXYContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card class="p-6 gap-4">
        <CardHeader class="p-0 flex-row justify-between items-center gap-2">
          <div class="flex flex-col gap-1">
            <CardTitle class="text-base leading-6">Course Enrollments</CardTitle>
            <CardDescription class="text-xs leading-4">Top categories</CardDescription>
          </div>
          <MoreHorizontal class="size-5 text-neutral-500" />
        </CardHeader>
        <CardContent class="p-0 mt-4">
          <ChartContainer class="w-full h-[250px]" :config="{ count: { color: '#8b5cf6', label: 'Enrollments' } }">
            <VisXYContainer :data="barData" class="h-full">
              <VisGroupedBar :x="(d: any, i: number) => i" :y="(d: any) => d.count" color="#8b5cf6" />
              <VisAxis type="x" :tickFormat="(i: number) => barData[i]?.cat || ''" />
              <ChartTooltip />
            </VisXYContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>

    <!-- USERS TABLE -->
    <Card class="p-6 gap-4">
      <CardHeader class="p-0 flex-row justify-between items-center gap-2 mb-4">
        <div class="flex flex-col gap-1">
          <CardTitle class="text-base leading-6">Recent Users</CardTitle>
          <CardDescription class="text-xs leading-4">Newly registered members</CardDescription>
        </div>
        <Button class="gap-1" size="sm" variant="outline">
          <ExternalLink class="size-4" /> View all
        </Button>
      </CardHeader>
      <CardContent class="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="user in recentUsers" :key="user.email">
              <TableCell>
                <div class="flex items-center gap-3">
                  <img :alt="user.name" class="size-8 object-cover rounded-full" :src="user.avatar" />
                  <span class="font-medium">{{ user.name }}</span>
                </div>
              </TableCell>
              <TableCell class="text-neutral-500">{{ user.email }}</TableCell>
              <TableCell>
                <Badge variant="secondary">{{ user.role }}</Badge>
              </TableCell>
              <TableCell class="text-neutral-500">{{ user.joinedDate }}</TableCell>
              <TableCell>
                <Badge :class="user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'text-neutral-500'"
                  :variant="user.status === 'Active' ? 'default' : 'outline'">
                  {{ user.status }}
                </Badge>
              </TableCell>
              <TableCell>
                <div class="flex justify-end gap-1">
                  <Button class="size-8 text-neutral-500" size="icon" variant="ghost">
                    <Pencil class="size-4" />
                  </Button>
                  <Button class="size-8 text-rose-500" size="icon" variant="ghost">
                    <Trash2 class="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  </div>
</template>

<script setup lang="ts">
import {
  BookOpen, ExternalLink, FileText, Minus, MoreHorizontal, Pencil,
  Shield, Trash2, TrendingUp, User
} from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

import { VisArea, VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";

const areaData = [
  { day: "Mon", users: 40 }, { day: "Tue", users: 62 }, { day: "Wed", users: 55 },
  { day: "Thu", users: 80 }, { day: "Fri", users: 74 }, { day: "Sat", users: 95 }, { day: "Sun", users: 88 },
];

const barData = [
  { cat: "Web", count: 320 }, { cat: "Data", count: 280 }, { cat: "AI", count: 410 },
  { cat: "Design", count: 190 }, { cat: "Mobile", count: 240 }, { cat: "Cloud", count: 300 },
];

const recentUsers = [
  {
    name: "Emma Watson",
    email: "emma.w@mail.com",
    role: "Instructor",
    joinedDate: "Mar 12, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1699899657675-1003c7d28f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    name: "James Carter",
    email: "j.carter@mail.com",
    role: "Student",
    joinedDate: "Mar 10, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1714750977930-e7a7f4611257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    name: "Sofia Nguyen",
    email: "sofia.n@mail.com",
    role: "Student",
    joinedDate: "Mar 08, 2025",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1699899657675-1003c7d28f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    name: "Liam Brooks",
    email: "liam.b@mail.com",
    role: "Moderator",
    joinedDate: "Mar 05, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1714750977930-e7a7f4611257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  }
];
</script>
