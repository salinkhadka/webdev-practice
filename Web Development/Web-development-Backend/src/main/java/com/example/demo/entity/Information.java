package com.example.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name="informations", uniqueConstraints = {
        @UniqueConstraint(name = "unique_title",
        columnNames = {"information_title"})
})
public class Information {


    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "information_seq_gen")
    @SequenceGenerator(name = "information_seq_gen",sequenceName = "information_seq",allocationSize = 1,initialValue = 1)
    @Id
    private Integer id;

    @Column(name="information_title",length = 100)
    private String title;

    public static class Stack {
        int stk[];
        int top=-1;
        int size;

        Stack(int size){
            this.size=size;
            stk=new int[size];

        }
        boolean isFull(){
            return top==stk.length-1;
        }
        boolean isEmpty(){
            return top==-1;
        }
        void push(int data){
            if(isFull()){
                System.out.println("com.example.demo.entity.Information.Stack overflow");


            }

            else{
                // top++;
                stk[top]=data;
            }
        }
        int pop(){
            if(isEmpty()){
                System.out.println("stack underflow");
                return -1;
            }
    //        int temp=top;
    //        top--;
            return stk[top--];

        }
        int peek(){
            return stk[top];
        }
        int size(){
            return top+1;
        }

    }
}
