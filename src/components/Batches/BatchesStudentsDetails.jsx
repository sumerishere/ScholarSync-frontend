import BatchDetails from './BatchDetails';
import StudentsDetails from './StudentsDetails';

const BatchesStudentsPage = () => {
  return (
    <div className="grid grid-rows-1">
    <div className="py-2">
      <BatchDetails />
    </div>
    <div className="overflow-y-auto">
      <StudentsDetails />
    </div>
  </div>
  );
};

export default BatchesStudentsPage;