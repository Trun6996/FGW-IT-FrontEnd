<template>
  <span class="role-badge" :class="roleClass">{{ role }}</span>
</template>

<script>
export default {
  name: 'RoleBadge',
  props: {
    role: {
      type: String,
      default: 'user'
    }
  },
  computed: {
    roleClass() {
      return {
        'role-admin': this.role === 'admin',
        'role-user': this.role === 'user'
      };
    }
  }
};
</script>

<style scoped>
.role-badge {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}
.role-badge.role-admin {
  background: #e91e63;
  color: #fff;
}
.role-badge.role-user {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
</style>
