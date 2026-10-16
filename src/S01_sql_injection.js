class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async findByName(name) {
    const sql = "SELECT * FROM users WHERE name = '" + name + "'";
    const result = await this.db.query(sql);
    return result.rows;
  }
}

module.exports = UserRepository;
