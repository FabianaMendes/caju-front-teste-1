import { Admission } from "~/types/Admission";

/** Ideal é que fique no .env como variável de ambiente,
 * mas para o contexto deste teste, para facilitar, vamos
 * setar direto no código
 */
const baseUrl = 'http://localhost:3000';

export const getRegistrations = async () => {
  try {
    const response = await fetch(`${baseUrl}/registrations`);
    if (!response.ok) {
      throw new Error('Falha ao buscar registros.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Falha ao buscar registros.');
  }
}

export const createAdmission = async (body: Admission) => {
  try {
    const response = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Falha ao adicionar funcionário.');
    }
    return response.json();
  } catch (error) {
    throw new Error('Falha ao adicionar funcionário.')
  }
}

export const searchRegisterByCpf = async (cpf: string) => {
  try {
    const response = await fetch(`${baseUrl}/registrations?cpf=${cpf}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar registro por cpf');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Falha ao buscar registro por cpf');
  }
}