<template>
  <v-container>
    <!-- Вступительное фото -->
    <h2 class="text-center mb-2">Hamster Kombat Free Keys 🔑</h2>
    <v-row class="text-center justify-center">
      <v-col cols="12" class="d-flex justify-center">
        <v-img
            src="@/assets/logo.jpg"
            alt="Intro Logo"
            class="intro-image"
            contain
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn :loading="loading" :disabled="loading" color="primary" @click="getKeys">Get All keys</v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center justify-center">
      <v-col>
        <v-card class="text-center">
          <v-card-title class="d-flex justify-space-between align-center justify-center">
            <h5 class="text-h5" v-if="!keys.length">Your keys will be here.</h5>
            <v-btn
                v-if="keys.length"
                @click="copyAllKeys"
                color="secondary"
                class="ml-2"
            >
              Copy All Keys
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-if="!keys.length"></v-col>
              <v-col
                  v-for="(group, prefix) in groupedKeys"
                  :key="prefix"
                  :cols="getColSize"
                  class="mb-2 d-flex flex-column"
              >
                <div v-for="(code, index) in group" :key="index"
                     @click="copyKey(`${code.prefix}-${code.keyValue}`)"
                     class="key-item text--black">
                  {{ code.prefix }}-{{ code.keyValue }}
                </div>
              </v-col>
            </v-row>
            <!-- Snackbar for copy confirmation -->
            <v-snackbar
                v-model="snackbar"
                timeout="2000"
                color="success"
            >
              Key copied to clipboard!
            </v-snackbar>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import KeysService from "@/components/service/keys.service";

export default {
  name: 'HamsterKeys',
  data: () => ({
    keys: [],
    loading: false, // Управление состоянием загрузки

    snackbar: false, // For showing the copy notification

  }),
  computed: {
    groupedKeys() {
      return this.keys.reduce((groups, key) => {
        if (!groups[key.prefix]) {
          groups[key.prefix] = [];
        }
        groups[key.prefix].push(key);
        return groups;
      }, {});
    },
    getColSize() {
      // Определяем количество колонок в зависимости от размера экрана
      if (this.$vuetify.breakpoint.xs) return 12; // Для мобильных устройств
      if (this.$vuetify.breakpoint.sm) return 6;  // Для планшетов
      if (this.$vuetify.breakpoint.md) return 4;  // Для ноутбуков
      if (this.$vuetify.breakpoint.lg) return 3;  // Для ПК
      return 2; // Для больших экранов
    },
  },
  methods: {
    copyAllKeys() {
      const allKeys = this.keys.map(code => `${code.prefix}-${code.keyValue}`).join('\n');
      navigator.clipboard.writeText(allKeys).then(() => {
        this.snackbar = true;
      });
    },
    copyKey(key) {
      navigator.clipboard.writeText(key).then(() => {
        this.snackbar = true; // Show the snackbar when copied
      });
    },
    async getKeys() {
      this.loading=true
      await KeysService.getKeys().then((response => {
        this.keys = response.data;
        this.loading = false
      }));
      this.loading=false

    },
  }
}
</script>
<style scoped>
.key-item {
  cursor: pointer;
  padding: 8px;
  background-color: #f5f5f5;
  margin: 4px 0;
  border-radius: 4px;
  white-space: nowrap; /* Отключаем перенос текста */
  overflow: hidden;
  text-overflow: ellipsis;
}
.intro-image {
  max-width: 100%; /* Не больше ширины контейнера */
  height: auto; /* Высота автоматически подстраивается */
  border-radius: 50px; /* Закругленные углы */
  max-height: 200px; /* Максимальная высота */
  object-fit: contain; /* Сохранение пропорций изображения */
}
.key-item:hover {
  background-color: #e0e0e0;
}
</style>