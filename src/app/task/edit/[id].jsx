import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Heading, Page } from '../../../components/UI';
import TaskForm from '../../../components/TaskForm';
import { useTasks } from '../../../context/TaskContext';

export default function EditTask() { const { id } = useLocalSearchParams(); const { tasks, updateTask } = useTasks(); const task = tasks.find((t) => t.id === id); if (!task) return <Page><Heading title="Tugas tidak ditemukan" /><Button title="Kembali" onPress={() => router.back()} /></Page>; return <Page><Heading title="Edit Tugas" subtitle="Perbarui detail tugas" /><TaskForm initial={task} submitLabel="Update Tugas" onSubmit={(changes) => { updateTask(task.id, changes); router.replace(`/task/${task.id}`); }} /></Page>; }
