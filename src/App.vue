<template>
  <v-app>
    <v-main>
      <HamsterKeys/>
    </v-main>
  </v-app>
</template>

<script>
import HamsterKeys from './components/HamsterKeys.vue';

export default {
  name: 'App',

  components: {
    HamsterKeys,
  },

  data: () => ({
    //
  }),
};
</script>
