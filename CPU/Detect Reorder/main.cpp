//
//  main.cpp
//  Detect Reorder
//
//  Created by 沈宇杰 on 2024/3/17.
//  https://gcc.godbolt.org/
//

#include <iostream>
#include <stdio.h>
#include <semaphore.h>
#include <thread>

int v1, v2, r1, r2;
sem_t start1, start2, complete;

void thread1(){
    while (true) {
        sem_wait(&start1);

        v1 = 1;
//        asm("mfence":::"memory");
        r1 = v2;

        sem_post(&complete);
    }
}

void thread2(){
    while (true) {
        sem_wait(&start2);

        v2 = 1;
//        asm("mfence":::"memory");
        r2 = v1;

        sem_post(&complete);
    }
}

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    sem_init(&start1, 0, 0);
    sem_init(&start2, 0, 0);
    sem_init(&complete, 0, 0);

    std::thread t1(thread1);
    std::thread t2(thread2);

    for (int i = 0; i < 300000; i++){
        v1 = v2 = 0;

        // start t1 & t2
        sem_post(&start1);
        sem_post(&start2);

        // wait for t1 & t2 completion
        sem_wait(&complete);
        sem_wait(&complete);

        if((r1 == 0) && (r2 == 0)){
            printf("reorder detect @ %d\n", i);
        }

    }

    t1.detach();
    t2.detach();
    return 0;
}


