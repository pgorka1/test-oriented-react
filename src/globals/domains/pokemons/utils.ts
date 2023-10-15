import { POKEMON_LIST_PAGE_SIZE } from './config';

export const getRangeByPage = (page: number) => ({
    start: page === 1 ? 0 : (page - 1) * POKEMON_LIST_PAGE_SIZE,
    end: page === 1 ? POKEMON_LIST_PAGE_SIZE : (page - 1) * POKEMON_LIST_PAGE_SIZE + POKEMON_LIST_PAGE_SIZE,
});
