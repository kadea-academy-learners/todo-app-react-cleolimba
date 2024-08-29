import React, { useState } from 'react'; 
import './App.css';

interface Tache {
  texte: string; 
  terminee: boolean;
}

function App() { 
  const [nouvelleTache, setNouvelleTache] = useState<string>(''); 
  const [listeTaches, setListeTaches] = useState<Tache[]>([]); 

  //la fonction pour gérer la soumission du formulaire
  const handleSubmit = (event: React.FormEvent) => { 
    event.preventDefault();
    if (nouvelleTache.trim()) { 
      const nouvelle: Tache = { texte: nouvelleTache, terminee: false }; 
      setListeTaches([...listeTaches, nouvelle]); 
      setNouvelleTache('');
    }
  };

  //la fonction pour gérer l'état de la case à crocher
  const handleCheckboxChange = (index: number) => {
    const nouvellesTaches = [...listeTaches];
    nouvellesTaches[index].terminee = !nouvellesTaches[index].terminee;
    setListeTaches(nouvellesTaches);
  };

  //la fonction pour gérer la suppresion de la tâche
  const handlDelete = (index: number) => {
    const nouvellesTaches = listeTaches.filter((_, i) => i !== index);
    setListeTaches(nouvellesTaches);
  }

  return ( 
    <div className="App"> 
      <h1>Liste de Tâches</h1>
      <form onSubmit={handleSubmit}> 
        <input
          type="text" 
          value={nouvelleTache} 
          onChange={(e) => setNouvelleTache(e.target.value)} 
          placeholder="Saisir une nouvelle tâche" 
        />
        <button type="submit">Ajouter une tâche</button> 
      </form>
      <ul>
        {listeTaches.map((tache, index) => (
          <li key={index} className={tache.terminee ? 'terminee' : ''}> 
            <input
              type="checkbox" 
              checked={tache.terminee} 
              onChange={() => handleCheckboxChange(index)} 
            />
            {tache.texte}
            <button onClick={() => handlDelete(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 
