import A from '@/layouts/sidebar/a.vue'
import TheLayout from '@/layouts/TheLayout.vue'
import NotFoundPage from '@/page/NotFoundPage.vue'
import AssetPage from '@/views/asset/AssetPage.vue'

export const routes = [
  {
    path: '/',
    component: TheLayout,
    children: [{ path: '/', component: AssetPage, name: 'home' }],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]
