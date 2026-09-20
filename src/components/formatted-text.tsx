import * as React from "react";

/**
 * Texto escrito pelo casal: preserva quebras de linha e transforma **negrito**
 * em <strong>. Sem dangerouslySetInnerHTML — só monta elementos React, então
 * qualquer HTML digitado continua aparecendo como texto puro.
 */
export function FormattedText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/gs);

  return (
    <>
      {parts.map((part, index) =>
        // O split com grupo de captura devolve os trechos em negrito nos índices ímpares.
        index % 2 === 1 ? <strong key={index}>{part}</strong> : <React.Fragment key={index}>{part}</React.Fragment>
      )}
    </>
  );
}
