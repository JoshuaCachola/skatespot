"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullTextSearchSetUp1620350107578 = void 0;
class FullTextSearchSetUp1620350107578 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      UPDATE skatespots SET document_with_weights = setweight(to_tsvector(name), 'A')
      || setweight(to_tsvector(city), 'B')
      || setweight(to_tsvector(state), 'C');

      CREATE INDEX document_weights_idx
      ON skatespots
      USING GIN (document_with_weights);

      CREATE FUNCTION skatespots_tsvector_trigger() RETURNS trigger AS $$
      begin
        new.document_with_weights :=
        setweight(to_tsvector(new.name), 'A')
        || setweight(to_tsvector(new.city), 'B')
        || setweight(to_tsvector(new.state), 'C');
        return new;
      end
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
      ON skatespots FOR EACH ROW EXECUTE PROCEDURE skatespots_tsvector_trigger();
    `);
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.FullTextSearchSetUp1620350107578 = FullTextSearchSetUp1620350107578;
//# sourceMappingURL=1620350107578-FullTextSearchSetUp.js.map