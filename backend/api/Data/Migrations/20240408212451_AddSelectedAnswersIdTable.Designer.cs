﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240408212451_AddSelectedAnswersIdTable")]
    partial class AddSelectedAnswersIdTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("api.Patients.Models.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateSubmittedForm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar");

                    b.Property<int>("Priority")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("api.Patients.Models.SelectedAnswerId", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AnswerId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PatientId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("SelectedAnswerIds");
                });

            modelBuilder.Entity("api.Questions.Models.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("QuestionId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Value")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("api.Questions.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar");

                    b.Property<bool>("Enabled")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PatientId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("api.Users.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Active")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("api.Patients.Models.SelectedAnswerId", b =>
                {
                    b.HasOne("api.Patients.Models.Patient", null)
                        .WithMany("SelectedAnswerIds")
                        .HasForeignKey("PatientId");
                });

            modelBuilder.Entity("api.Questions.Models.Answer", b =>
                {
                    b.HasOne("api.Questions.Models.Question", null)
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId");
                });

            modelBuilder.Entity("api.Questions.Models.Question", b =>
                {
                    b.HasOne("api.Patients.Models.Patient", null)
                        .WithMany("Questions")
                        .HasForeignKey("PatientId");
                });

            modelBuilder.Entity("api.Patients.Models.Patient", b =>
                {
                    b.Navigation("Questions");

                    b.Navigation("SelectedAnswerIds");
                });

            modelBuilder.Entity("api.Questions.Models.Question", b =>
                {
                    b.Navigation("Answers");
                });
#pragma warning restore 612, 618
        }
    }
}
