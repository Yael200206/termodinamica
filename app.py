# -*- coding: utf-8 -*-
"""THERMODYNAMICS U3 - UNIFICADO"""

import math
try:
    from CoolProp.CoolProp import PropsSI
except ImportError:
    print("La biblioteca CoolProp no está instalada. Instálala usando 'pip install CoolProp'.")

# ---------------- Funciones de turbina ----------------
def calcular_velocidad_salida_turbina(d1, d2, v1, vesp1, vesp2):
    A1 = math.pi * (d1 / 2) ** 2
    A2 = math.pi * (d2 / 2) ** 2
    rho1 = 1 / vesp1
    rho2 = 1 / vesp2
    return (rho1 * A1 * v1) / (rho2 * A2)

def calcular_potencia(d1, d2, v1, v2, h1, h2, vesp1, vesp2):
    A1 = math.pi * (d1 / 2) ** 2
    rho1 = 1 / vesp1
    mdot = rho1 * A1 * v1
    potencia = mdot * ((h1 - h2) + (v1**2 - v2**2)/2)
    return potencia / 550  # hp

def main_turbina():
    print("Cálculo de la potencia de salida de una turbina")
    try:
        d1_in = float(input("Diámetro entrada (pulgadas): "))
        d2_in = float(input("Diámetro salida (pulgadas): "))
        d1 = d1_in / 12
        d2 = d2_in / 12

        v1 = float(input("Velocidad entrada (ft/s): "))
        P1 = float(input("Presión entrada (psia): "))
        T1 = float(input("Temperatura entrada (°F): "))
        P2 = float(input("Presión salida (psia): "))
        T2 = float(input("Temperatura salida (°F): "))

        P1_SI = P1 * 6894.76
        T1_SI = (T1 - 32) * 5/9 + 273.15
        P2_SI = P2 * 6894.76
        T2_SI = (T2 - 32) * 5/9 + 273.15

        h1 = PropsSI('H', 'P', P1_SI, 'T', T1_SI, 'Water') / 1055.06
        h2 = PropsSI('H', 'P', P2_SI, 'T', T2_SI, 'Water') / 1055.06
        vesp1 = PropsSI('V', 'P', P1_SI, 'T', T1_SI, 'Water') * 35.3147
        vesp2 = PropsSI('V', 'P', P2_SI, 'T', T2_SI, 'Water') * 35.3147

        v2 = calcular_velocidad_salida_turbina(d1, d2, v1, vesp1, vesp2)
        potencia = calcular_potencia(d1, d2, v1, v2, h1, h2, vesp1, vesp2)

        print(f"\nVelocidad salida: {v2:.2f} ft/s")
        print(f"Potencia salida: {potencia:.2f} hp")
    except Exception as e:
        print(f"Error: {e}")

# ---------------- Funciones de calor, entalpía y flujo ----------------
def calcular_calor_transferido():
    h1 = float(input("Entalpía entrada (kJ/kg): "))
    h2 = float(input("Entalpía salida (kJ/kg): "))
    v1 = float(input("Velocidad entrada (m/s): "))
    v2 = float(input("Velocidad salida (m/s): "))
    delta_energia_cinetica = (v2**2 - v1**2)/2 / 1000
    q = h2 - h1 + delta_energia_cinetica
    print(f"Calor transferido por unidad de masa: {q:.2f} kJ/kg")

def calcular_entalpia():
    u = float(input("Energía interna específica (kJ/kg): "))
    P = float(input("Presión (kPa): "))
    v = float(input("Volumen específico (cm³/g): "))
    v_m3_kg = v * 1e-3
    h = u + P * v_m3_kg
    print(f"Entalpía específica: {h:.2f} kJ/kg")

def calcular_trabajo(Q, delta_U):
    W = Q - delta_U
    return W

def main_trabajo():
    Q = float(input("Calor añadido (kJ): "))
    delta_U = float(input("Cambio energía interna (kJ): "))
    W = calcular_trabajo(Q, delta_U)
    print(f"Energía transferida como trabajo: {W} kJ")

# ---------------- Funciones de boquillas y toberas ----------------
def calculo_tobera_mejorado():
    d1 = float(input("Diámetro entrada (cm): "))
    P1 = float(input("Presión entrada (kPa): "))
    T1 = float(input("Temperatura entrada (°C): "))
    P2 = float(input("Presión salida (kPa): "))
    T2 = float(input("Temperatura salida (°C): "))
    v1 = float(input("Velocidad entrada (m/s): "))
    h1 = float(input("Entalpía entrada (kJ/kg): ")) * 1000
    h2 = float(input("Entalpía salida (kJ/kg): ")) * 1000
    V_esp1 = float(input("Volumen específico entrada (cm³/g): ")) / 1000
    V_esp2 = float(input("Volumen específico salida (cm³/g): ")) / 1000

    v2 = math.sqrt(v1**2 + 2*(h1-h2))
    A1 = math.pi * (d1/100)**2 /4
    A2 = A1 * (v1 * V_esp2)/(v2 * V_esp1)
    d2 = math.sqrt(4*A2/math.pi) *100
    print(f"Velocidad salida: {v2:.2f} m/s")
    print(f"Diámetro salida: {d2:.2f} cm")

def calculo_boquilla_agua():
    d1 = float(input("Diámetro entrada (cm): "))
    d2 = float(input("Diámetro salida (cm): "))
    tiempo = float(input("Tiempo para llenar (s): "))
    volumen = float(input("Volumen a llenar (litros): "))/1000

    Q = volumen/tiempo
    A1 = math.pi*(d1/100)**2/4
    A2 = math.pi*(d2/100)**2/4
    v1 = Q/A1
    v2 = Q/A2
    m_dot = 1000*Q
    print(f"Flujo volumétrico: {Q*1000:.2f} L/s")
    print(f"Flujo másico: {m_dot:.2f} kg/s")
    print(f"Velocidad entrada: {v1:.2f} m/s")
    print(f"Velocidad salida: {v2:.2f} m/s")

# ---------------- Funciones de compresión y cilindro-pistón ----------------
def proceso_compresion_dos_etapas():
    print("Cálculo proceso compresión dos etapas")
    P1 = float(input("Presión inicial (bar): "))
    P2 = float(input("Presión final (bar): "))
    T = float(input("Temperatura constante (°C): "))
    R = 8.314
    Cv = 5/2*R
    Cp = 7/2*R
    T_k = T+273.15
    T_inter = T_k*(P2/P1)
    Q1 = Cv*(T_inter-T_k)
    W1 = 0
    ΔU1 = Q1
    Q2 = Cp*(T_k-T_inter)
    W2 = R*(T_k-T_inter)
    ΔU2 = Cv*(T_k-T_inter)
    print(f"Temperatura intermedia: {T_inter:.2f} K")
    print(f"Calor total: {Q1+Q2:.2f} J/mol")
    print(f"Trabajo total: {W1+W2:.2f} J/mol")
    print(f"Energía interna total: {ΔU1+ΔU2:.2f} J/mol")

def cilindro_piston_electrico():
    m = float(input("Masa de agua (g): "))/1000
    P = float(input("Presión constante (kPa): "))
    I = float(input("Corriente eléctrica (A): "))
    V = float(input("Voltaje (V): "))
    t = float(input("Tiempo de operación (min): "))*60
    Q_perdido = float(input("Calor perdido (kJ): "))*1000
    Q_electrico = V*I*t
    Q_neto = Q_electrico - Q_perdido
    h1_vapor_sat = 2725.3
    h1_liquido_sat = 561.47
    h1 = h1_liquido_sat*1000
    h2 = h1 + Q_neto/m
    h2_kJ = h2/1000
    print(f"Calor eléctrico: {Q_electrico/1000:.2f} kJ")
    print(f"Calor neto: {Q_neto/1000:.2f} kJ")
    print(f"Entalpía final: {h2_kJ:.2f} kJ/kg")
    if h2_kJ > h1_vapor_sat:
        print("Estado final: Vapor sobrecalentado")
    elif h1_liquido_sat <= h2_kJ <= h1_vapor_sat:
        print("Estado final: Mezcla líquido-vapor")
        x = (h2_kJ - h1_liquido_sat)/(h1_vapor_sat - h1_liquido_sat)
        print(f"Calidad: {x:.3f}")
    else:
        print("Estado final: Líquido subenfriado")

# ---------------- Menú principal ----------------
def main_completo():
    while True:
        print("\n" + "="*50)
        print("SISTEMA DE CÁLCULOS TERMODINÁMICOS")
        print("="*50)
        print("1. Proceso compresión dos etapas")
        print("2. Cilindro-pistón eléctrico")
        print("3. Cálculo toberas")
        print("4. Boquilla agua")
        print("5. Turbina")
        print("6. Calor transferido en serpentín")
        print("7. Energía como trabajo")
        print("8. Salir")
        opcion = input("Seleccione opción (1-8): ")
        if opcion=='1': proceso_compresion_dos_etapas()
        elif opcion=='2': cilindro_piston_electrico()
        elif opcion=='3': calculo_tobera_mejorado()
        elif opcion=='4': calculo_boquilla_agua()
        elif opcion=='5': main_turbina()
        elif opcion=='6': calcular_calor_transferido()
        elif opcion=='7': main_trabajo()
        elif opcion=='8': break
        else: print("Opción no válida.")
        input("\nPresione Enter para continuar...")

if __name__=="__main__":
    main_completo()
