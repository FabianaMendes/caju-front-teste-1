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
      throw new Error('Falha ao buscar registros');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Falha ao buscar registros');
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
      throw new Error('Falha ao incluir admissão');
    }
    return response.json();
  } catch (error) {
    throw new Error('Falha ao incluir admissão')
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

export const updateCard = async (cardData: Admission) => {
  try {
    const response = await fetch(`${baseUrl}/registrations/${cardData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar status');
    }
    return response.json();
  } catch (error) {
    throw new Error('Falha ao atualizar status')
  }
}

export const deleteRegister = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/registrations/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Falha ao deletar card');
    }
    return response.json();
  } catch (error) {
    throw new Error('Falha ao deletar card')
  }
}