import type { Recipes, Recipe } from '@/features/post-place/types/types';

const ENDPOINT = 'https://dummyjson.com/recipes';

interface QueryOptions {
  // 검색
  q?: string;
  // 필터링
  fields?: string;
  // 페이지네이션
  limit?: number;
  startIndex?: number;
  // 정렬
  sortBy?: keyof Recipe;
  order?: 'asc' | 'desc';
}

// CREATE -------------------------------------------------------

export const addRecipe = async (newRecipe: Partial<Recipe>) => {
  const response = await fetch(`${ENDPOINT}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRecipe),
  });

  if (!response.ok) {
    throw new Error('레시피 추가에 실패했습니다. 😭');
  }

  return (await response.json()) as Recipe;
};

// READ ---------------------------------------------------------

export const getRecipes = async ({
  q = '',
  limit = 10,
  startIndex = 0,
  fields = '',
  sortBy = 'id',
  order = 'asc',
}: QueryOptions = {}) => {
  let requestQuery = `${ENDPOINT}/`;

  if (q.trim().length > 0) {
    requestQuery += `search/?q=${q}`;
  }

  if (limit) {
    requestQuery += requestQuery.includes('?')
      ? `&limit=${limit}`
      : `?limit=${limit}`;
  }

  if (startIndex) {
    requestQuery += `&skip=${startIndex - 1}`;
  }

  if (fields.trim().length > 0) {
    requestQuery += `&select=${fields}`;
  }

  if (sortBy) {
    requestQuery += `&sortBy=${sortBy}`;
  }

  if (order) {
    requestQuery += `&order=${order}`;
  }

  return (await fetch(requestQuery).then((response) =>
    response.json()
  )) as Recipes;
};

export const getRecipeById = async (id: string | number) => {
  return (await fetch(`${ENDPOINT}/${id}`).then((response) =>
    response.json()
  )) as Recipe;
};

// UPDATE -------------------------------------------------------

export const editRecipe = async (editRecipe: Partial<Recipe>) => {
  const { id, ...recipe } = editRecipe;

  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('레시피 수정에 실패했습니다. 🥲');
  }

  return (await response.json()) as Recipe;
};

// DELETE -------------------------------------------------------

export const deleteRecipe = async (deleteRecipeId: number) => {
  const response = await fetch(`${ENDPOINT}/${deleteRecipeId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('레시피 삭제에 실패했습니다. 🥲');
  }

  return (await response.json()) as Recipe;
};
