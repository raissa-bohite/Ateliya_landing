"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateFR } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Shirt,
  AlertCircle,
  CheckCircle,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react";

// Types
interface Evenement {
  id: string;
  reference: string;
  client: string;
  article: string;
  type: "livraison" | "essayage" | "debut" | "relance";
  date: string;
  heure?: string;
  statut: string;
  priorite: "basse" | "normale" | "haute" | "urgente";
}

// Données mock - Janvier 2025
const evenementsMock: Evenement[] = [
  {
    id: "1",
    reference: "CMD-2025-001",
    client: "Mme Kouadio",
    article: "Robe de soirée",
    type: "livraison",
    date: "2025-01-20",
    heure: "14:00",
    statut: "en_cours",
    priorite: "haute",
  },
  {
    id: "2",
    reference: "CMD-2025-003",
    client: "Mme Traoré",
    article: "Ensemble wax",
    type: "essayage",
    date: "2025-01-20",
    heure: "10:00",
    statut: "essayage",
    priorite: "haute",
  },
  {
    id: "3",
    reference: "CMD-2025-002",
    client: "M. Diallo",
    article: "Costume 3 pièces",
    type: "livraison",
    date: "2025-01-21",
    statut: "en_attente",
    priorite: "normale",
  },
  {
    id: "4",
    reference: "CMD-2025-005",
    client: "Mme Bamba",
    article: "Robe de mariée",
    type: "essayage",
    date: "2025-01-22",
    heure: "15:00",
    statut: "finitions",
    priorite: "urgente",
  },
  {
    id: "5",
    reference: "CMD-2025-006",
    client: "M. Ouattara",
    article: "Boubou brodé",
    type: "livraison",
    date: "2025-01-25",
    statut: "coupe",
    priorite: "normale",
  },
  {
    id: "6",
    reference: "CMD-2025-007",
    client: "Mme Sanogo",
    article: "Jupe crayon",
    type: "livraison",
    date: "2025-01-22",
    statut: "termine",
    priorite: "basse",
  },
  {
    id: "7",
    reference: "CMD-2025-008",
    client: "M. Touré",
    article: "Pantalon sur mesure",
    type: "debut",
    date: "2025-01-23",
    statut: "en_attente",
    priorite: "normale",
  },
  {
    id: "8",
    reference: "CMD-2025-009",
    client: "Mme Koné",
    article: "Robe cocktail",
    type: "livraison",
    date: "2025-01-28",
    statut: "assemblage",
    priorite: "haute",
  },
  {
    id: "9",
    reference: "CMD-2025-010",
    client: "M. Cissé",
    article: "Chemise brodée",
    type: "essayage",
    date: "2025-01-24",
    heure: "11:00",
    statut: "finitions",
    priorite: "normale",
  },
  {
    id: "10",
    reference: "CMD-2025-004",
    client: "M. Koné",
    article: "Chemise sur mesure",
    type: "relance",
    date: "2025-01-19",
    statut: "termine",
    priorite: "normale",
  },
];

const getTypeConfig = (type: string) => {
  const config: Record<
    string,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    livraison: {
      label: "Livraison",
      className: "bg-emerald-500 text-white",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    essayage: {
      label: "Essayage",
      className: "bg-purple-500 text-white",
      icon: <User className="h-3 w-3" />,
    },
    debut: {
      label: "Début confection",
      className: "bg-blue-500 text-white",
      icon: <Shirt className="h-3 w-3" />,
    },
    relance: {
      label: "Relance paiement",
      className: "bg-amber-500 text-white",
      icon: <AlertCircle className="h-3 w-3" />,
    },
  };
  return (
    config[type] || {
      label: type,
      className: "bg-gray-500 text-white",
      icon: null,
    }
  );
};

const getPrioriteColor = (priorite: string) => {
  const colors: Record<string, string> = {
    basse: "border-l-slate-400",
    normale: "border-l-teal-500",
    haute: "border-l-orange-500",
    urgente: "border-l-red-500",
  };
  return colors[priorite] || "border-l-gray-400";
};

const joursNoms = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const moisNoms = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default function PlanningPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Janvier 2025
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
  const [filterType, setFilterType] = useState("Tous");

  // Navigation
  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 0, 20)); // Simulation "aujourd'hui" = 20 Jan 2025
  };

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days: (Date | null)[] = [];

    // Jours du mois précédent
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Jours du mois courant
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Filtrer les événements
  const filteredEvenements = evenementsMock.filter((e) => {
    return filterType === "Tous" || e.type === filterType;
  });

  // Obtenir les événements d'un jour
  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredEvenements.filter((e) => e.date === dateStr);
  };

  // Stats
  const stats = {
    livraisonsJour: evenementsMock.filter(
      (e) => e.type === "livraison" && e.date === "2025-01-20"
    ).length,
    essayagesJour: evenementsMock.filter(
      (e) => e.type === "essayage" && e.date === "2025-01-20"
    ).length,
    totalSemaine: evenementsMock.filter((e) => {
      const d = new Date(e.date);
      return d >= new Date("2025-01-20") && d <= new Date("2025-01-26");
    }).length,
    urgentes: evenementsMock.filter((e) => e.priorite === "urgente").length,
  };

  const isToday = (date: Date) => {
    // Simulation: "aujourd'hui" = 20 Jan 2025
    return (
      date.getDate() === 20 &&
      date.getMonth() === 0 &&
      date.getFullYear() === 2025
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Planning</h1>
          <p className="text-teal-600 mt-1">
            Gérez vos livraisons et rendez-vous
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={goToToday}
            className="border-[#B5E5E8] text-teal-700 hover:bg-[#E0F5F6]"
          >
            Aujourd'hui
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">
                  Livraisons (Aujourd'hui)
                </p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.livraisonsJour}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Essayages (Aujourd'hui)</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.essayagesJour}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Cette semaine</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.totalSemaine}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.urgentes}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contrôles du calendrier */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevMonth}
                className="text-teal-700 hover:bg-[#E0F5F6]"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold text-teal-800 min-w-[200px] text-center">
                {moisNoms[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextMonth}
                className="text-teal-700 hover:bg-[#E0F5F6]"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 border-[#B5E5E8]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tous</SelectItem>
                  <SelectItem value="livraison">Livraisons</SelectItem>
                  <SelectItem value="essayage">Essayages</SelectItem>
                  <SelectItem value="debut">Début confection</SelectItem>
                  <SelectItem value="relance">Relances</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border border-[#B5E5E8] rounded-lg p-1">
                <button
                  onClick={() => setViewMode("month")}
                  className={`p-2 rounded ${
                    viewMode === "month"
                      ? "bg-teal-100 text-teal-700"
                      : "text-teal-500 hover:bg-[#F0FAFA]"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-teal-100 text-teal-700"
                      : "text-teal-500 hover:bg-[#F0FAFA]"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vue Calendrier ou Liste */}
      {viewMode === "month" ? (
        <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
          <CardContent className="p-4">
            {/* En-têtes des jours */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {joursNoms.map((jour) => (
                <div
                  key={jour}
                  className="text-center text-sm font-semibold text-teal-600 py-2"
                >
                  {jour}
                </div>
              ))}
            </div>

            {/* Grille des jours */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[100px] bg-gray-50 rounded-lg"
                    ></div>
                  );
                }

                const events = getEventsForDay(day);
                const dayIsToday = isToday(day);

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[100px] border rounded-lg p-1 transition-colors ${
                      dayIsToday
                        ? "bg-teal-50 border-teal-400"
                        : "bg-white border-[#E0F5F6] hover:border-[#B5E5E8]"
                    }`}
                  >
                    <div
                      className={`text-right text-sm font-medium mb-1 ${
                        dayIsToday ? "text-teal-700" : "text-teal-600"
                      }`}
                    >
                      {dayIsToday ? (
                        <span className="bg-teal-600 text-white px-2 py-0.5 rounded-full">
                          {day.getDate()}
                        </span>
                      ) : (
                        day.getDate()
                      )}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 3).map((event) => {
                        const typeConfig = getTypeConfig(event.type);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate border-l-2 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow ${getPrioriteColor(
                              event.priorite
                            )}`}
                            title={`${event.client} - ${event.article}`}
                          >
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-1 ${typeConfig.className.replace(
                                "text-white",
                                ""
                              )}`}
                            ></span>
                            <span className="text-teal-700">
                              {event.client}
                            </span>
                          </div>
                        );
                      })}
                      {events.length > 3 && (
                        <div className="text-xs text-teal-500 text-center">
                          +{events.length - 3} autres
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
          <CardContent className="p-4">
            <div className="space-y-3">
              {filteredEvenements
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((event) => {
                  const typeConfig = getTypeConfig(event.type);
                  return (
                    <div
                      key={event.id}
                      className={`flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E0F5F6] hover:border-[#B5E5E8] transition-colors border-l-4 ${getPrioriteColor(
                        event.priorite
                      )}`}
                    >
                      <div className="text-center min-w-[60px]">
                        <p className="text-2xl font-bold text-teal-800">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-xs text-teal-600">
                          {moisNoms[new Date(event.date).getMonth()].slice(
                            0,
                            3
                          )}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={typeConfig.className}>
                            {typeConfig.icon}
                            <span className="ml-1">{typeConfig.label}</span>
                          </Badge>
                          {event.heure && (
                            <span className="text-xs text-teal-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {event.heure}
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-teal-800">
                          {event.client}
                        </p>
                        <p className="text-sm text-teal-600">
                          {event.article} • {event.reference}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            event.priorite === "urgente"
                              ? "bg-red-100 text-red-700 border-red-300"
                              : event.priorite === "haute"
                              ? "bg-orange-100 text-orange-700 border-orange-300"
                              : "bg-teal-100 text-teal-700 border-teal-300"
                          } border`}
                        >
                          {event.priorite}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Légende */}
      <Card className="border border-[#B5E5E8]">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-teal-700">Légende:</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-teal-600">Livraison</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-sm text-teal-600">Essayage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm text-teal-600">Début confection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-sm text-teal-600">Relance</span>
            </div>
            <span className="mx-2 text-teal-300">|</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 border-l-2 border-red-500"></span>
              <span className="text-sm text-teal-600">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 border-l-2 border-orange-500"></span>
              <span className="text-sm text-teal-600">Haute</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
