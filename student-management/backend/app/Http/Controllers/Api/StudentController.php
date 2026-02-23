<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    /**
     * Lista todos los estudiantes con filtros opcionales.
     */
    public function index(Request $request)
    {
        $query = Student::query();

        if ($request->has('test_status')) {
            $query->where('test_status', $request->test_status);
        }

        if ($request->has('grade')) {
            $query->where('grade', $request->grade);
        }

        return response()->json($query->get());
    }

    /**
     * Crea un nuevo estudiante.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'id_card' => 'required|string|unique:students',
            'grade' => 'required|string',
            'test_status' => 'required|in:pendiente,en_progreso,completada,reprobada',
        ]);

        $student = Student::create($validated);

        return response()->json($student, 201);
    }

    /**
     * Muestra un estudiante específico.
     */
    public function show(Student $student)
    {
        return response()->json($student);
    }

    /**
     * Actualiza los datos de un estudiante.
     */
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'id_card' => 'sometimes|required|string|unique:students,id_card,' . $student->id,
            'grade' => 'sometimes|required|string',
            'test_status' => 'sometimes|required|in:pendiente,en_progreso,completada,reprobada',
        ]);

        $student->update($validated);

        return response()->json($student);
    }

    /**
     * Elimina un estudiante.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json(null, 204);
    }
}
