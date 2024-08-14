from vlp.src.schemas import *
import math


class VlpService:
    g = 9.8

    def __init__(self, model: CalculationRequestSchema):
        self.model = model

    def calculate(self):
        A = self._calc_A(self.model.fluid_compressibility, self.model.fluid_density)
        delta_x = self.model.depth/self.model.sections_number # может быть проблема
        po_0 = self.model.fluid_density


        delta_p_list = []
        for q in self.model.q_values:
            p = self.model.well_head_pressure
            po_i = po_0
            # delta_p = p
            u = self._calc_u_0(q=q,
                               d=self.model.pipe_diameter)

            for _ in range(self.model.sections_number):
                B = self._calc_B(fluid_density_i=po_i,
                                 fluid_density_permanent=po_0,
                                 fluid_compressibility=self.model.fluid_compressibility,
                                 delta_x=delta_x,
                                 teta=self.model.inclination_angle,
                                 moody_coefficient=self.model.moody_coefficient,
                                 u_i=u,
                                 pipe_diameter=self.model.pipe_diameter
                                 )
                C = self._calc_C(fluid_density_i=po_i,
                                 delta_x=delta_x,
                                 teta=self.model.inclination_angle,
                                 moody_coefficient=self.model.moody_coefficient,
                                 u_i=u,
                                 pipe_diameter=self.model.pipe_diameter
                                 )
                delta_p = self._calc_delta_p(a=A, b=B, c=C)
                delta_u = self._calc_delta_u(u_i=u,
                                             p_i=po_i,
                                             p_0=po_0,
                                             c=self.model.fluid_compressibility,
                                             delta_p=delta_p)
                delta_po = self._calc_delta_po(po_0=po_0,
                                               c=self.model.fluid_compressibility,
                                               delta_p=delta_p)

                # Обновление данных
                po_i -= delta_po
                u -= delta_u
                p -= delta_p
            delta_p_list.append(p)
        return [i/(10**5) for i in delta_p_list]

    def _calc_A(self, fluid_compressibility, fluid_density):
        return fluid_compressibility * fluid_density

    def _calc_B(self,
                fluid_density_i,
                fluid_density_permanent,
                fluid_compressibility,
                delta_x,
                teta,
                moody_coefficient,
                u_i,
                pipe_diameter):
        x = fluid_density_i + fluid_density_permanent * fluid_compressibility * fluid_density_i * delta_x * (
            self.g * math.sin(teta * math.pi/180) + (moody_coefficient * (u_i**2)/(2* pipe_diameter))
        ) - fluid_density_permanent * fluid_compressibility * fluid_density_i * (u_i**2)
        return x

    def _calc_C(self,
                fluid_density_i,
                delta_x,
                teta,
                moody_coefficient,
                u_i,
                pipe_diameter):
        x = (fluid_density_i ** 2) * delta_x * (
                self.g * math.sin(teta * math.pi/180) + (moody_coefficient * (u_i ** 2) / (2 * pipe_diameter)))
        return x

    def _calc_delta_p(self, a, b, c):
        aaa = (b**2) - 4 * a * c
        return (-b + (((b**2) - 4 * a * c)**0.5)) / (2 * a)

    def _calc_delta_u(self, u_i, p_i, p_0, delta_p, c):
        try:
            x = ((u_i*p_i)/(p_i + p_0 * c * delta_p)) - u_i
            return x
        except:
            print('f')

    def _calc_delta_po(self, po_0, c, delta_p):
        x = po_0 * c * delta_p
        return x

    def _calc_u_0(self, q, d):
        return (q*4)/(math.pi * (d**2))