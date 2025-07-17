import React from 'react';
import { Stay } from '@/types';
import { calculateDaysBetween } from '@/utils/dateUtils';
import { calculateRemainingDaysForDate } from '@/utils/calculations';

interface StayFormProps {
  dateSelection: {
    currentStart: string;
    currentEnd: string;
    stayTitle: string;
  };
  stays: Stay[];
  isDarkMode: boolean;
  editingStay: Stay | null;
  onStayTitleChange: (title: string) => void;
  onAddStay: () => void;
  onUpdateStay: () => void;
  onClearSelection: () => void;
  onCancelEdit: () => void;
}

export const StayForm: React.FC<StayFormProps> = ({
  dateSelection,
  stays,
  isDarkMode,
  editingStay,
  onStayTitleChange,
  onAddStay,
  onUpdateStay,
  onClearSelection,
  onCancelEdit
}) => {
  const { currentStart, currentEnd, stayTitle } = dateSelection;

  const isFormValid = currentStart && currentEnd;
  const exceedsQuota = isFormValid && calculateDaysBetween(currentStart, currentEnd) > 
    calculateRemainingDaysForDate(new Date(currentStart), stays);

  return (
    <div className="mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      {editingStay && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            ✏️ Modification du séjour: {editingStay.title}
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nom du séjour
        </label>
        <input
          type="text"
          value={stayTitle}
          onChange={(e) => onStayTitleChange(e.target.value)}
          placeholder="Nom du séjour (optionnel)"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      
      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 flex-1">
          <div className="text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Début :</span>
            <span className="ml-2 text-green-600 dark:text-green-400 font-bold block sm:inline">
              {currentStart ? new Date(currentStart).toLocaleDateString('fr-FR') : 'Cliquez sur une date'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Fin :</span>
            <span className="ml-2 text-green-600 dark:text-green-400 font-bold block sm:inline">
              {currentEnd ? new Date(currentEnd).toLocaleDateString('fr-FR') : 'Cliquez sur une autre date'}
            </span>
          </div>
          {isFormValid && (
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Durée :</span>
              <span className={`ml-2 font-bold block sm:inline ${
                exceedsQuota ? 'text-red-500' : 'text-green-600 dark:text-green-400'
              }`}>
                {calculateDaysBetween(currentStart, currentEnd)} jours
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={onClearSelection}
            className="px-3 py-1 rounded-md text-sm font-medium transition-colors bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Effacer
          </button>
          {editingStay && (
            <button
              onClick={onCancelEdit}
              className="px-3 py-1 rounded-md text-sm font-medium transition-colors bg-red-200 dark:bg-red-600 text-red-700 dark:text-red-300 hover:bg-red-300 dark:hover:bg-red-500"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
      
      {exceedsQuota && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">
            ⚠️ Séjour sélectionné ({calculateDaysBetween(currentStart, currentEnd)} jours) dépasse vos jours restants pour cette date de début ({calculateRemainingDaysForDate(new Date(currentStart), stays)} jours).
          </p>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>💡 Cliquez sur une date pour sélectionner le début, puis sur une autre date pour la fin.</p>
        <p>📅 Une fois le début sélectionné, seules les dates dans la limite du quota restant sont cliquables.</p>
        <p>🔵 Point bleu = Date de début | 🟢 Point vert = Date de fin | 🟡 Dates jaunes = Séjours existants</p>
        <p>⚪ Point gris = Dates non disponibles (quota épuisé)</p>
      </div>
      
      <div className="flex justify-center mt-4">
        <button
          onClick={editingStay ? onUpdateStay : onAddStay}
          disabled={!isFormValid || !!exceedsQuota}
          className={`relative group px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
            isDarkMode
              ? "bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-black"
              : "bg-gradient-to-r from-black to-orange-600 hover:from-gray-800 hover:to-orange-700 text-white"
          }`}
        >
          <span className="relative z-10 flex items-center space-x-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingStay ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
            </svg>
            <span className="text-sm sm:text-base">{editingStay ? 'Modifier le séjour' : 'Ajouter le séjour'}</span>
          </span>
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};