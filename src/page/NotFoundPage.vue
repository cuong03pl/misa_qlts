<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">{{ t('common.notFound.title') }}</h1>
      <p class="error-description">
        {{ t('common.notFound.description') }}
      </p>
      <MsButton type="primary" @click="goHome" class="back-button">
        {{ t('common.notFound.button') }}
      </MsButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

.not-found-content {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: var(--btn-primary);
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(26, 164, 200, 0.2);
}

.error-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
}

.error-description {
  font-size: 16px;
  color: #666666;
  margin-bottom: 32px;
  line-height: 1.6;
}

.back-button {
  height: 40px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
}
</style>
