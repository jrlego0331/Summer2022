import pygame as pg
from pygame.locals import *
import sys
from math import sin, cos, tan, pi
from random import randint
from matplotlib import pyplot as plt, animation
import seaborn as sns

#pygmae inits
pg.init()
fps = 144
window_x, window_y = 500, 500
window = pg.display.set_mode((window_x, window_y))
pg.display.set_caption('orbits')
t=0

#pyplot inits
fig = plt.figure(figsize=(6, 20))

#rand bounds
pos_bound_x, pos_bound_y = (0, window_x), (0, window_y)

#funcs
def magnitude(vector):
    return ((vector[0]**2)+(vector[1]**2))**0.5
def acc_g(M, r, G=6.67*(10**-11)):
    if r==0: return 0
    if r>0: return (G*M)/(r**2)
    if r<0: return -(G*M)/(r**2)

#obj class
class obj:
    def __init__(self, mass=100, pos='r', vel=(0,0), acc=(0, 0)):
        if pos == 'r':
            pos = (randint(pos_bound_x[0], pos_bound_x[1]), randint(pos_bound_y[0], pos_bound_y[1]))
        self.record = [(mass, pos, vel, acc)]
    def update(self, obj_list):
        #mass update
        mass = self.record[-1][0]
        #pos update
        pos = (self.record[-1][1][0]+self.record[-1][2][0], self.record[-1][1][1]+self.record[-1][2][1])
        #vel update
        vel = (self.record[-1][2][0]+self.record[-1][3][0], self.record[-1][2][1]+self.record[-1][3][1])
        #acc update
        acc = [0, 0]
        for comp in obj_list:
            acc[0]+=acc_g(comp.record[-1][0], comp.record[-1][1][0]-self.record[-1][1][0])
            acc[1]+=acc_g(comp.record[-1][0], comp.record[-1][1][1]-self.record[-1][1][1])
        '''
        print('-'*100)
        print(magnitude(self.record[-1][2]), '\t->\t',magnitude(vel))
        print(magnitude(self.record[-1][3]), '\t->\t',magnitude(acc))
        '''
        self.record.append((mass, pos, vel, acc))

def draw(obj_list):
    window.fill((0,0,0))

    for target in obj_list:
        target.update(obj_list)
        brightness=255
        pg.draw.circle(window, (brightness, brightness, brightness), target.record[-1][1], 5)
    pg.display.update()

obj_list = []
obj_count = 2
for i in range(obj_count):
    obj_list.append(obj())

while True:
    for event in pg.event.get():
        if event.type == QUIT:
            pg.quit()
            sys.exit()
    
    draw(obj_list)
    pg.time.Clock().tick(fps)
    t+=1