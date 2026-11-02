import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../constants/theme';
import { Card } from './UI';

const priorityColor = { High: C.danger, Medium: C.warning, Low: C.success };
const statusColor = { 'To Do': C.warning, 'In Progress': C.primary, Completed: C.success };
export function StatusBadge({ value, priority = false }) { const color = priority ? priorityColor[value] : statusColor[value]; return <View style={{ backgroundColor: `${color}18`, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20 }}><Text style={{ color, fontSize: 10, fontWeight: '800' }}>{priority ? `${value} priority` : value}</Text></View>; }
export default function TaskCard({ task, onPress, compact = false }) { return <Pressable onPress={onPress}><Card style={{ marginBottom: 11, padding: 15 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}><View style={{ flex: 1, paddingRight: 10 }}><Text numberOfLines={1} style={{ color: C.text, fontWeight: '800', fontSize: 15 }}>{task.title}</Text><Text style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>{task.category}{!compact ? `  ·  ${task.deadline}` : ''}</Text></View><Ionicons name="chevron-forward" size={18} color={C.muted} /></View><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 13 }}><StatusBadge value={task.status} /><StatusBadge value={task.priority} priority /></View></Card></Pressable>; }
