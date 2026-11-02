import React from 'react';
import { router } from 'expo-router';
import { Heading, Page } from '../../components/UI';
import TaskForm from '../../components/TaskForm';
import { useTasks } from '../../context/TaskContext';

export default function AddTask() { const { addTask } = useTasks(); return <Page><Heading title="Tambah Tugas" subtitle="Catat hal penting yang perlu diselesaikan" /><TaskForm submitLabel="Simpan Tugas" onSubmit={(task) => { addTask(task); router.back(); }} /></Page>; }
