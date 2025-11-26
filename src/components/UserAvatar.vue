<template>
  <span class="user-avatar">{{ initial }}</span>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    username: {
      type: String,
      default: '?'
    }
  },
  computed: {
    initial() {
      return this.username ? this.username.charAt(0).toUpperCase() : '?';
    }
  }
};
</script>

<style scoped>
.user-avatar {
  background: #fff;
  color: #1b70ff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
</style>
