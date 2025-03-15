import { Admission } from "~/types/Admission";
import { isProductionEnv } from "~/utils";

const baseUrl = isProductionEnv()
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_API_URL_LOCAL;

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