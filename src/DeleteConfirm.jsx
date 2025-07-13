import React from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p style={{ 
          fontWeight: '700', 
          color: '#e07b39', 
          fontSize: '18px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px' 
        }}>
          <span role="img" aria-label="Aviso">⚠️</span>
          Tem certeza que deseja excluir este produto?
        </p>
        <div className="confirm-buttons">
          <button onClick={onConfirm} className="confirm-yes">Excluir</button>
          <button onClick={onCancel} className="confirm-no">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
