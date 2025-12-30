"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatXOF, formatXOFShort, formatDateFR } from "@/lib/utils";
import {
  ShoppingBag,
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
  Scissors,
  Package,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

// Données mock
const stats = {
  caJour: 125000,
  caMois: 2850000,
  commandesEnCours: 12,
  commandesEnAttente: 5,
  commandesTerminees: 8,
  clientsActifs: 45,
  tauxLivraison: 94.5,
};

const revenusHebdo = [
  { jour: "Lun", montant: 180000 },
  { jour: "Mar", montant: 220000 },
  { jour: "Mer", montant: 195000 },
  { jour: "Jeu", montant: 280000 },
  { jour: "Ven", montant: 350000 },
  { jour: "Sam", montant: 420000 },
  { jour: "Dim", montant: 85000 },
];

const commandesParCategorie = [
  { categorie: "Robes", nombre: 25 },
  { categorie: "Costumes", nombre: 18 },
  { categorie: "Ensembles", nombre: 15 },
  { categorie: "Boubous", nombre: 12 },
  { categorie: "Chemises", nombre: 8 },
];

const commandesUrgentes = [
  {
    id: "CMD-2025-001",
    client: "Mme Kouadio",
    article: "Robe de soirée",
    dateLivraison: "2025-01-20",
    statut: "en_cours",
    priorite: "urgente",
  },
  {
    id: "CMD-2025-003",
    client: "M. Diallo",
    article: "Costume 3 pièces",
    dateLivraison: "2025-01-21",
    statut: "essayage",
    priorite: "haute",
  },
  {
    id: "CMD-2025-007",
    client: "Mme Bamba",
    article: "Robe de mariée",
    dateLivraison: "2025-01-22",
    statut: "en_cours",
    priorite: "urgente",
  },
  {
    id: "CMD-2025-012",
    client: "M. Koné",
    article: "Boubou brodé",
    dateLivraison: "2025-01-23",
    statut: "en_attente",
    priorite: "haute",
  },
];

const alertes = [
  {
    type: "stock",
    message: "Tissu Wax Bleu - Stock bas (2m restants)",
    niveau: "warning",
  },
  {
    type: "paiement",
    message: "Mme Traoré - Reste à payer: 25,000 FCFA",
    niveau: "info",
  },
  {
    type: "livraison",
    message: "CMD-2025-005 en retard de 2 jours",
    niveau: "danger",
  },
];

const getStatutConfig = (statut: string) => {
  const config: Record<string, { label: string; className: string }> = {
    en_attente: { label: "En attente", className: "bg-amber-500 text-white" },
    en_cours: { label: "En cours", className: "bg-teal-500 text-white" },
    essayage: { label: "Essayage", className: "bg-purple-500 text-white" },
    termine: { label: "Terminé", className: "bg-emerald-500 text-white" },
  };
  return (
    config[statut] || { label: statut, className: "bg-gray-500 text-white" }
  );
};

const getPrioriteConfig = (priorite: string) => {
  const config: Record<string, { className: string }> = {
    urgente: { className: "bg-red-100 text-red-700 border border-red-300" },
    haute: {
      className: "bg-orange-100 text-orange-700 border border-orange-300",
    },
    normale: { className: "bg-teal-100 text-teal-700 border border-teal-300" },
  };
  return config[priorite] || { className: "bg-gray-100 text-gray-700" };
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Dashboard</h1>
          <p className="text-teal-600 mt-1">
            Bienvenue ! Voici l'activité de votre atelier
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-ateliya-soft text-teal-700 hover:bg-ateliya-ice"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Aujourd'hui
          </Button>
          <Button className="bg-teal-700 hover:bg-teal-600 text-white shadow-lg">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <div className="kpi-card-bar"></div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-teal-600">
                CA du jour
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-lg">
                <Wallet className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-800">
              {formatXOF(stats.caJour)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">
                +12% vs hier
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <div className="kpi-card-bar"></div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-teal-600">
                Commandes en cours
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-lg">
                <Scissors className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-800">
              {stats.commandesEnCours}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-amber-600 font-medium">
                {stats.commandesEnAttente} en attente
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <div className="kpi-card-bar"></div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-teal-600">
                Clients actifs
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-800">
              {stats.clientsActifs}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">
                +5 ce mois
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-teal-600">
                Taux de livraison
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-800">
              {stats.tauxLivraison}%
            </p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-teal-600 font-medium">
                À temps ce mois
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenus hebdo */}
        <Card className="border-ateliya-soft shadow-ateliya">
          <CardHeader className="pb-2 bg-gradient-to-r from-ateliya-pale to-transparent border-b border-ateliya-soft">
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <div className="p-2 bg-teal-700 rounded-lg shadow-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Revenus de la semaine
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenusHebdo}>
                  <defs>
                    <linearGradient
                      id="colorMontant"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#53B0B7" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#53B0B7"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0F5F6" />
                  <XAxis dataKey="jour" stroke="#64748B" fontSize={12} />
                  <YAxis
                    tickFormatter={(v) => formatXOFShort(v)}
                    stroke="#64748B"
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatXOF(value), "Montant"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #B5E5E8",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px -10px rgba(45, 122, 128, 0.3)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="montant"
                    stroke="#53B0B7"
                    strokeWidth={3}
                    fill="url(#colorMontant)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Commandes par catégorie */}
        <Card className="border-ateliya-soft shadow-ateliya">
          <CardHeader className="pb-2 bg-gradient-to-r from-ateliya-pale to-transparent border-b border-ateliya-soft">
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <div className="p-2 bg-teal-700 rounded-lg shadow-lg">
                <Package className="h-4 w-4 text-white" />
              </div>
              Commandes par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commandesParCategorie} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0F5F6" />
                  <XAxis type="number" stroke="#64748B" fontSize={12} />
                  <YAxis
                    dataKey="categorie"
                    type="category"
                    stroke="#64748B"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value: number) => [value, "Commandes"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #B5E5E8",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="nombre" fill="#53B0B7" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commandes urgentes & Alertes */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Commandes urgentes */}
        <Card className="lg:col-span-2 border-ateliya-soft shadow-ateliya">
          <CardHeader className="pb-2 bg-gradient-to-r from-ateliya-pale to-transparent border-b border-ateliya-soft">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-teal-800">
                <div className="p-2 bg-teal-700 rounded-lg shadow-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                Livraisons à venir
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-600 hover:text-teal-800 hover:bg-ateliya-ice"
              >
                Voir tout <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-700 hover:to-teal-800">
                  <TableHead className="text-white font-bold">
                    Référence
                  </TableHead>
                  <TableHead className="text-white font-bold">Client</TableHead>
                  <TableHead className="text-white font-bold">
                    Article
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Livraison
                  </TableHead>
                  <TableHead className="text-white font-bold">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commandesUrgentes.map((cmd, index) => (
                  <TableRow
                    key={cmd.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-ateliya-pale/50"
                    } hover:bg-ateliya-ice transition-colors`}
                  >
                    <TableCell className="font-mono text-sm font-semibold text-teal-700">
                      {cmd.id}
                    </TableCell>
                    <TableCell className="font-medium text-teal-800">
                      {cmd.client}
                    </TableCell>
                    <TableCell className="text-teal-700">
                      {cmd.article}
                    </TableCell>
                    <TableCell className="text-teal-700">
                      {formatDateFR(cmd.dateLivraison)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatutConfig(cmd.statut).className}
                        >
                          {getStatutConfig(cmd.statut).label}
                        </Badge>
                        <Badge
                          className={getPrioriteConfig(cmd.priorite).className}
                        >
                          {cmd.priorite}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alertes */}
        <Card className="border-ateliya-soft shadow-ateliya">
          <CardHeader className="pb-2 bg-gradient-to-r from-ateliya-pale to-transparent border-b border-ateliya-soft">
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <div className="p-2 bg-amber-500 rounded-lg shadow-lg">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              Alertes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {alertes.map((alerte, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border-l-4 ${
                  alerte.niveau === "danger"
                    ? "bg-red-50 border-red-500"
                    : alerte.niveau === "warning"
                    ? "bg-amber-50 border-amber-500"
                    : "bg-teal-50 border-teal-500"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    alerte.niveau === "danger"
                      ? "text-red-800"
                      : alerte.niveau === "warning"
                      ? "text-amber-800"
                      : "text-teal-800"
                  }`}
                >
                  {alerte.message}
                </p>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-2 border-ateliya-soft text-teal-700 hover:bg-ateliya-ice"
            >
              Voir toutes les alertes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CA mensuel */}
      <Card className="border-ateliya-soft shadow-ateliya bg-gradient-to-r from-teal-700 to-teal-800">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-teal-100 text-sm">
                Chiffre d'affaires du mois
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                {formatXOF(stats.caMois)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-teal-100 text-sm">Terminées ce mois</p>
                <p className="text-2xl font-bold text-white">
                  {stats.commandesTerminees}
                </p>
              </div>
              <div className="w-px h-12 bg-teal-600"></div>
              <div className="text-right">
                <p className="text-teal-100 text-sm">Objectif</p>
                <p className="text-2xl font-bold text-white">3.5M</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-teal-600/50 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(stats.caMois / 3500000) * 100}%` }}
            ></div>
          </div>
          <p className="text-teal-100 text-sm mt-2">
            {((stats.caMois / 3500000) * 100).toFixed(0)}% de l'objectif atteint
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
