import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullTextSearchSetUp1620350107578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE skatespots SET document_with_weights = setweight(to_tsvector(name), 'A')
      || setweight(to_tsvector(city), 'B')
      || setweight(to_tsvector(state), 'C');

      CREATE INDEX document_weights_idx
      ON skatespots
      USING GIN (document_with_weights);

      CREATE FUNCTION skatespots_tsvector_trigger() RETURNS trigger AS $$
      begin
        new.document_with_weights :=
        setweight('english', new.name, 'A')
        || setweight('english', new.city, 'B')
        || setweight('english', new.state, 'C');
        return new;
      end
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
      ON skatespots FOR EACH ROW EXECUTE PROCEDURE skatespots_tsvector_trigger();
    `);
  }

  public async down(): Promise<void> {}
}
