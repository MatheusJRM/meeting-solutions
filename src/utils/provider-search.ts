import { ProviderDataProps } from "types/async-storage-context-types";

const normalizeString = (str: string) => {
  return str
    .normalize("NFD") // Normaliza caracteres acentuados (ex: "é" -> "e")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
    .replace(/[^a-zA-Z0-9]/g, "") // Remove caracteres especiais e espaços
    .toLowerCase(); // Converte para minúsculas
};

export const handleSeachProvider = (
  provider: ProviderDataProps,
  searchTerm: string
) => {
  const normalizedString = normalizeString(searchTerm);

  return (
    normalizeString(provider.nome).toLowerCase().includes(normalizedString) ||
    normalizeString(provider.cidade).toLowerCase().includes(normalizedString) ||
    provider.tiposProduto.some((produto) =>
      normalizeString(produto).toLowerCase().includes(normalizedString)
    )
  );
};
