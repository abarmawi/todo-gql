// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('Todo', ['parentListId'], {
      name: 'todo_parent_list_id',
    });
    await queryInterface.addIndex('Todo', ['status'], {
      name: 'todo_status',
    });
    await queryInterface.addIndex('Todo', ['userId'], {
      name: 'todo_user_id',
    });
    await queryInterface.addIndex('TodoList', ['userId'], {
      name: 'todo_list_user_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('Todo', 'todo_parent_list_id');
    await queryInterface.removeIndex('Todo', 'todo_status');
    await queryInterface.removeIndex('Todo', 'todo_user_id');
    await queryInterface.removeIndex('TodoList', 'todo_list_user_id');
  },
};
