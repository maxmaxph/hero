import { AppDataSource } from '../data-source';
import { Hero } from '../models/interfaces/HeroInterface';

/**
 * Le role du service est d'aller chercher les données,
 * pour les mettre à disposition de controlleur.
 */
export class HeroService {
  getAllHeros(): Promise<Hero[]> {
    return AppDataSource.query(`SELECT * FROM hero;`);
  }

  getOneHeroById(id: number): Promise<Hero> {
    return AppDataSource.query(`SELECT * FROM hero WHERE id = $1;`,[id]);
  }

  createNewHero(newHero: Hero): Promise<any> {
    return AppDataSource.query(`INSERT INTO hero (name, power, life) VALUES ($1, $2, $3);`, [newHero.name, newHero.power, newHero.life]);
  }

  updateOneHero(id: number, changes: Hero): Promise<any> {
    return AppDataSource.query(`UPDATE hero SET name = $1, power = $2, life = $3 WHERE id = $4;`,
      [changes.name, changes.power, changes.life, id]);
  }

  deleteOneHero(id: number): Promise<any> {
    return AppDataSource.query(`DELETE FROM hero WHERE id = $1;`,[id]);
  }
}
