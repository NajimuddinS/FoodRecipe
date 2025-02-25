import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { memo } from 'react';

const DraggableRecipe = memo(({ recipe, index, provided }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <RecipeCard recipe={recipe} />
  </div>
));

DraggableRecipe.displayName = 'DraggableRecipe';

function SavedRecipes() {
  const { savedRecipes, reorderRecipes } = useRecipes();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderRecipes(result.source.index, result.destination.index);
  };

  const renderRecipes = (provided) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {savedRecipes.map((recipe, index) => (
        <Draggable
          key={recipe.id}
          draggableId={recipe.id.toString()}
          index={index}
        >
          {(dragProvided) => (
            <DraggableRecipe
              recipe={recipe}
              index={index}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Recipes</h1>
      
      {savedRecipes.length === 0 ? (
        <p className="text-gray-600">No saved recipes yet.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="recipes">
            {renderRecipes}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default SavedRecipes;