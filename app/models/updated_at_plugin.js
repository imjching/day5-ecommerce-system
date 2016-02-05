module.exports = exports = function updatedAtPlugin (schema, options) {
  schema.add({ updated_at: { type: Date, default: Date.now } });

  schema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
};